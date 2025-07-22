package Lumina.Exceptions;

import org.springframework.http.HttpStatus;

import java.util.Map;

public class ValidationException extends RuntimeException {
	
	private final Map<String, String> errors;
	private final HttpStatus status;
	
	public ValidationException (Map<String, String> errors, HttpStatus status) {
		super("Validation failed");
		this.errors = errors;
		this.status = status;
	}
	
	public Map<String, String> getErrors () {
		return errors;
	}
	
	public HttpStatus getStatus () {
		return status;
	}
}
