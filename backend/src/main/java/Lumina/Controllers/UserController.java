package Lumina.Controllers;

import Lumina.DTO.AuthResponseDTO;
import Lumina.DTO.LoginDTO;
import Lumina.Entities.User;
import Lumina.Security.JwtUtil;
import Lumina.Services.MailService;
import Lumina.Services.UserService;
import Lumina.Services.VerificationCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping ("/api")
public class UserController {
	
	@Autowired
	private MailService mailService;
	@Autowired
	private VerificationCodeService verificationCodeService;
	@Autowired
	private UserService userService;
	@Autowired
	private MessageSource messageSource;
	@Autowired
	private JwtUtil jwtUtil;
	
	@GetMapping ("/email-verification")
	public ResponseEntity<AuthResponseDTO> emailVerification (@RequestParam String email, Locale locale) {
		String code = generateCode();
		boolean sentSuccessfully = mailService.sendVerificationEmail(email, code);
		
		if (sentSuccessfully) {
			verificationCodeService.saveCode(email, code);
			return ResponseEntity.ok(new AuthResponseDTO("success", messageSource.getMessage("verificationMailSuccess", null, locale)));
		}
		else {
			return ResponseEntity.status(500).body(new AuthResponseDTO("error", messageSource.getMessage("verificationMailError", null, locale)));
		}
	}
	
	private String generateCode () {
		int code = new Random().nextInt(900000) + 100000; // 6-digit code
		return String.valueOf(code);
	}
	
	@GetMapping ("/otp-verification")
	public ResponseEntity<AuthResponseDTO> otpConfirmation (@RequestParam String email, @RequestParam String inputCode, Locale locale) {
		int result = verificationCodeService.verifyCode(email, inputCode);
		if (result == 1) {
			return ResponseEntity.ok(new AuthResponseDTO("success", messageSource.getMessage("otpConfirmed", null, locale)));
		}
		else if (result == 0) {
			return ResponseEntity.status(410).body(new AuthResponseDTO("warning", messageSource.getMessage("otpExpired", null, locale)));
		}
		else {
			return ResponseEntity.status(401).body(new AuthResponseDTO("error", messageSource.getMessage("otpIncorrect", null, locale)));
			
		}
		
	}
	
	@PostMapping ("/complete-profile")
	public ResponseEntity<AuthResponseDTO> completeProfile (@RequestBody User user, Locale locale) {
		if (Objects.equals(user.getPhoneNum(), "")) {
			user.setPhoneNum(null);
		}
		userService.createOrUpdate(user, false);
		return ResponseEntity.ok(new AuthResponseDTO("success", messageSource.getMessage("userCreated", null, locale)));
		
	}
	
	@GetMapping ("/check-email")
	public boolean isEmailExistsInDB (@RequestParam String email) {
		return userService.isEmailExists(email);
	}
	
	@PostMapping ("/user-login")
	public ResponseEntity<AuthResponseDTO> userLogin(@RequestBody LoginDTO login, Locale locale) {
		User found = userService.readByEmail(login.getEmail());
		if (found == null) {
			return ResponseEntity.status(404).body(new AuthResponseDTO("error", messageSource.getMessage("userNotFound", null, locale)));
			
		} else if (!userService.isPasswordValid(login.getPassword(), found.getId())) {
			return ResponseEntity.status(401).body(new AuthResponseDTO("warning", messageSource.getMessage("incorrectLoginInformation", null, locale)));
		} else {
			String token = jwtUtil.generateToken(login.getEmail(), found.getName(), found.getId());
			return ResponseEntity.ok(new AuthResponseDTO("success", messageSource.getMessage("loginSuccess", null, locale), token));
		}
	}
	
	@GetMapping("/users/{userId}/public-info")
	public ResponseEntity<Map<String, String>> getUserPublicInfo (@PathVariable String userId) {
		Optional<User> user = Optional.ofNullable(userService.read(Integer.parseInt(userId)));
		if (user.isPresent()) {
			Map<String, String> response = new HashMap<>();
			response.put("name", user.get().getName());
			response.put("displayName", user.get().getDisplayName());
			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
}
