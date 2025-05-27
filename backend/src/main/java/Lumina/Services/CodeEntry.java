package Lumina.Services;

public class CodeEntry {
	
	private final String code;
	private final long expiresAt;
	
	public CodeEntry (String code, long expiresAt) {
		this.code = code;
		this.expiresAt = expiresAt;
	}
	
	public String getCode () {
		return code;
	}
	
	public boolean isExpired () {
		return System.currentTimeMillis() > expiresAt;
	}
}
