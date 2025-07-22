package Lumina.Security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
	
	private final Key key;
	private final int minutes = 60;
	private final long expiration = minutes * 60 * 1000;
	
	public JwtUtil (@Value("${jwt.secret}") String secret) {
		this.key = Keys.hmacShaKeyFor(secret.getBytes());
	}
	
	public String generateToken (String email, String name, int id) {
		return Jwts.builder()
				.setSubject(email)
				.claim("fullName", name)
				.claim("userId", id)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + expiration))
				.signWith(key)
				.compact();
	}
	
	public String extractEmail (String token) {
		return Jwts.parserBuilder().setSigningKey(key).build()
				.parseClaimsJws(token).getBody().getSubject();
	}
	
	public void validateToken (String token) {
		Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token);
	}
}
