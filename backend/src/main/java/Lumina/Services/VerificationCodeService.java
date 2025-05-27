package Lumina.Services;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class VerificationCodeService {
	
	private final Map<String, CodeEntry> codes = new ConcurrentHashMap<>();
	
	public void saveCode (String email, String code) {
		long expiresAt = System.currentTimeMillis() + 5 * 60 * 1000;
		codes.put(email, new CodeEntry(code, expiresAt));
	}
	
	public int verifyCode (String email, String inputCode) {
		CodeEntry entry = codes.get(email);
		if (entry == null || entry.isExpired()) {
			codes.remove(email);
			return 0;
		}
		boolean isValid = entry.getCode().equals(inputCode);
		if (isValid) {
			codes.remove(email); // one-time use
			return 1;
		}
		return 2;
	}
}
