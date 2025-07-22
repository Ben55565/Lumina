package Lumina.Exceptions;

import org.springframework.http.HttpStatus;

public class JwtAuthException extends RuntimeException{
	
	private final HttpStatus status;
	
	public JwtAuthException (String message, HttpStatus status) {
		super(message);
		this.status = status;
	}
	
	public HttpStatus getStatus () {
		return status;
	}
}
