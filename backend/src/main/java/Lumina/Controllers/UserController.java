package Lumina.Controllers;

import Lumina.Entities.User;
import Lumina.Services.MailService;
import Lumina.Services.UserService;
import Lumina.Services.VerificationCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
	@PostMapping ("/email-verification")
	public ResponseEntity<Map<String, String>> emailVerification (@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String code = generateCode();
		boolean sentSuccecfully = mailService.sendVerificationEmail(email, code);
		
		if (sentSuccecfully) {
			verificationCodeService.saveCode(email, code);
			return ResponseEntity.ok().body(Map.of("result", "success", "info", "Verification email has been sent succecfully!"));
		}
		else {
			return ResponseEntity.status(500).body(Map.of("result", "error", "info", "There was an error sending the email, try again later"));
		}
	}
	
	private String generateCode () {
		int code = new Random().nextInt(900000) + 100000; // 6-digit code
		return String.valueOf(code);
	}
	
	@PostMapping ("/otp-verification")
	public ResponseEntity<Map<String, String>> otpConfirmation (@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String inputCode = request.get("code");
		int result = verificationCodeService.verifyCode(email, inputCode);
		System.out.println(result);
		if (result == 1) {
			return ResponseEntity.ok().body(Map.of("result", "success", "info", "OTP has been confirmed!"));
		}
		else if (result == 0) {
			return ResponseEntity.ok().body(Map.of("result", "warning", "info", "Code has been expired, Please generate a new one."));
		}
		else {
			return ResponseEntity.ok().body(Map.of("result", "error", "info", "Incorrect code has been entered. please check and try again."));
		}
		
	}
	
	@PostMapping ("/complete-profile")
	public ResponseEntity<Map<String, String>> completeProfile (@RequestBody User user) {
		if (Objects.equals(user.getPhoneNum(), "")) {
			user.setPhoneNum(null);
		}
		User saved = userService.createOrUpdate(user, false);
		return ResponseEntity.ok(Map.of(
				"result", "success",
				"info", "User has been created!"
		));
		
		
	}
}
