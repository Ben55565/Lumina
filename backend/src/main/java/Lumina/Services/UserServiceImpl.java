package Lumina.Services;

import Lumina.Entities.User;
import Lumina.Exceptions.ValidationException;
import Lumina.Repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	@Autowired
	public UserServiceImpl (UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}
	
	@Override
	@Transactional
	public User createOrUpdate (User user, boolean isUpdate) {
		Map<String, String> errors = new HashMap<>();
		if (isUpdate) {
			User existingUser = read(user.getId());
			if (existingUser == null) {
				errors.put("searchInDB", "Internal Error: Please try again later");
			}
			if (existingUser != null) {
				if (isEmailExists(user.getEmail())) {
					if (! Objects.equals(existingUser.getEmail(), user.getEmail())) {
						errors.put("email", "Email already in use");
					}
				}
				if (isDisplayNameExists(user.getDisplayName())) {
					if (! Objects.equals(existingUser.getDisplayName(), user.getDisplayName())) {
						errors.put("displayName", "Display name already in use");
					}
				}
				if (isPhoneNumExists(user.getPhoneNum()) && user.getPhoneNum() != null) {
					if (! Objects.equals(user.getPhoneNum(), existingUser.getPhoneNum())) {
						errors.put("phoneNum", "Phone number already in use");
					}
				}
				
			}
			
			if (! errors.isEmpty()) {
				throw new ValidationException(errors);
			}
			String hashedPassword = passwordEncoder.encode(user.getPassword());
			user.setPassword(hashedPassword);
			return existingUser.updateFrom(user);
			
		}
		else {
			if (isEmailExists(user.getEmail())) {
					errors.put("email", "Email already in use");
			}
			if (isDisplayNameExists(user.getDisplayName())) {
					errors.put("displayName", "Display name already in use");
			}
			if (isPhoneNumExists(user.getPhoneNum()) && user.getPhoneNum() != null) {
					errors.put("phoneNum", "Phone number already in use");
			}
			if (! errors.isEmpty()) {
				System.out.println(errors);
				throw new ValidationException(errors);
			}
			
			return userRepository.save(new User(user.getEmail(), passwordEncoder.encode(user.getPassword()), user.getName(), user.isAnonymous(), user.getBirthDate(), user.getPhoneNum(), user.getDisplayName()));
		}
	}
	
	@Override
	public User read (int id) {
		return userRepository.findById(id).orElse(null);
	}
	
	@Override
	@Transactional
	public void delete (int id) {
		userRepository.deleteById(id);
	}
	
	@Override
	public boolean isEmailExists (String email) {
		return userRepository.existsByEmail(email);
	}
	
	@Override
	public boolean isDisplayNameExists (String displayName) {
		return userRepository.existsByDisplayName(displayName);
	}
	
	@Override
	public boolean isPhoneNumExists (String phoneNum) {
		return userRepository.existsByPhoneNum(phoneNum);
	}
	
	@Override
	public boolean isPasswordValid (String rawPassword, int userId) {
		String hashedPassword = read(userId).getPassword();
		return passwordEncoder.matches(rawPassword, hashedPassword);
	}
	
}
