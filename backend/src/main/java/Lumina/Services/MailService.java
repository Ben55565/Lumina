package Lumina.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	public boolean sendVerificationEmail (String to, String code) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(to);
			message.setSubject("Your Lumina verification code");
			message.setText("Your verification code is: " + code);
			message.setFrom("your_email@gmail.com");
			
			javaMailSender.send(message);
			return true; // success
		}
		catch (MailException e) {
			e.printStackTrace();
			return false;
		}
	}
}
