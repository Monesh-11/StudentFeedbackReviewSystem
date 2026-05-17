package com.lms.service;

import com.lms.dto.request.CodeExecutionRequest;
import com.lms.dto.response.CodeExecutionResponse;
import com.lms.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class CompilerService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${app.judge0.api-url}")
    private String judge0ApiUrl;

    @Value("${app.judge0.api-key}")
    private String rapidApiKey;

    @Value("${app.judge0.api-host}")
    private String rapidApiHost;

    public CodeExecutionResponse executeCode(CodeExecutionRequest request) {
        try {
            // Encode source code and stdin to Base64
            String encodedSource = Base64.getEncoder().encodeToString(request.getSourceCode().getBytes());
            String encodedStdin = request.getStdin() != null ? 
                    Base64.getEncoder().encodeToString(request.getStdin().getBytes()) : "";

            // Prepare request body
            Map<String, Object> body = new HashMap<>();
            body.put("source_code", encodedSource);
            body.put("language_id", request.getLanguageId());
            body.put("stdin", encodedStdin);
            body.put("base64_encoded", true);
            body.put("wait", true); // Synchronous execution for simplicity

            // Prepare headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("X-RapidAPI-Key", rapidApiKey);
            headers.set("X-RapidAPI-Host", rapidApiHost);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            // Execute request
            String url = judge0ApiUrl + "/submissions?base64_encoded=true&wait=true";
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

            if (response.getBody() == null) {
                throw new BadRequestException("Failed to get response from compiler");
            }

            return mapToResponse(response.getBody());

        } catch (Exception e) {
            throw new BadRequestException("Code execution failed: " + e.getMessage());
        }
    }

    private CodeExecutionResponse mapToResponse(Map<String, Object> body) {
        CodeExecutionResponse response = new CodeExecutionResponse();
        
        // Helper to decode Base64 safely
        response.setStdout(decode((String) body.get("stdout")));
        response.setStderr(decode((String) body.get("stderr")));
        response.setCompileOutput(decode((String) body.get("compile_output")));
        response.setMessage(decode((String) body.get("message")));
        
        response.setTime((String) body.get("time"));
        response.setMemory((String) body.get("memory") != null ? body.get("memory").toString() : null);

        Map<String, Object> statusMap = (Map<String, Object>) body.get("status");
        if (statusMap != null) {
            response.setStatus((String) statusMap.get("description"));
        }

        return response;
    }

    private String decode(String value) {
        if (value == null) return null;
        try {
            return new String(Base64.getDecoder().decode(value)).trim();
        } catch (IllegalArgumentException e) {
            return value;
        }
    }
}
