package Lumina.Advice;

import Lumina.Exceptions.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(ValidationException.class)
	public ResponseEntity<Map<String, Object>> handleValidationException(ValidationException ex) {
		return ResponseEntity.badRequest().body(Map.of(
				"result", "error",
				"info", ex.getErrors()
		));
	}
	
	@ExceptionHandler (Exception.class)
	public ResponseEntity<Map<String, String>> handleOtherErrors (Exception ex) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Unexpected error occurred"));
	}
}
