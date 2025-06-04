package Lumina.Controllers;

import Lumina.Entities.User;
import Lumina.Services.MailService;
import Lumina.Services.UserService;
import Lumina.Services.VerificationCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.Random;

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
	
	@GetMapping ("/email-verification")
	public ResponseEntity<Map<String, String>> emailVerification (@RequestParam String email, Locale locale) {
		String code = generateCode();
		boolean sentSuccessfully = mailService.sendVerificationEmail(email, code);
		
		if (sentSuccessfully) {
			verificationCodeService.saveCode(email, code);
			return ResponseEntity.ok().body(Map.of("result", "success", "info", messageSource.getMessage("verificationMailSuccess", null, locale)));
		}
		else {
			return ResponseEntity.status(500).body(Map.of("result", "error", "info", messageSource.getMessage("verificationMailError", null, locale)));
		}
	}
	
	private String generateCode () {
		int code = new Random().nextInt(900000) + 100000; // 6-digit code
		return String.valueOf(code);
	}
	
	@GetMapping ("/otp-verification")
	public ResponseEntity<Map<String, String>> otpConfirmation (@RequestParam String email, @RequestParam String inputCode, Locale locale) {
		int result = verificationCodeService.verifyCode(email, inputCode);
		if (result == 1) {
			return ResponseEntity.ok().body(Map.of("result", "success", "info", messageSource.getMessage("otpConfirmed", null, locale)));
		}
		else if (result == 0) {
			return ResponseEntity.ok().body(Map.of("result", "warning", "info", messageSource.getMessage("otpExpired", null, locale)));
		}
		else {
			return ResponseEntity.ok().body(Map.of("result", "error", "info", messageSource.getMessage("otpIncorrect", null, locale)));
		}
		
	}
	
	@PostMapping ("/complete-profile")
	public ResponseEntity<Map<String, String>> completeProfile (@RequestBody User user, Locale locale) {
		if (Objects.equals(user.getPhoneNum(), "")) {
			user.setPhoneNum(null);
		}
		userService.createOrUpdate(user, false);
		return ResponseEntity.ok(Map.of("result", "success", "info", messageSource.getMessage("userCreated", null, locale)));
		
	}
	
	@GetMapping ("/check-email")
	public boolean isEmailExistsInDB (@RequestParam String email) {
		return userService.isEmailExists(email);
	}
	
	@GetMapping ("user-login")
	public ResponseEntity<Map<String, String>> userLogin(@RequestParam String email, @RequestParam String password) {
		User found = userService.readByEmail(email);
		if (found == null) {
			return ResponseEntity.ok(Map.of("result", "error", "info", "User not found"));
		} else {
			if (!userService.isPasswordValid(password, found.getId())) {
				return ResponseEntity.ok(Map.of("result", "warning", "info", "Email or password incorrect"));
			} else {
				return ResponseEntity.ok(Map.of("result", "success", "info", "Logged in successfuly"));
			}
		}
	}
}
