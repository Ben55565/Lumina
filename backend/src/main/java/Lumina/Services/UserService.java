package Lumina.Services;

import Lumina.Entities.User;

import java.util.List;

public interface UserService {
	
	User createOrUpdate (User user, boolean isUpdate);
	
	User read (int id);
	
	User readByEmail(String email);
	
	void delete (int id);
	
	boolean isEmailExists (String email);
	
	boolean isDisplayNameExists (String displayName);
	
	boolean isPhoneNumExists (String phoneNum);
	
	boolean isPasswordValid (String rawPassword, int userId);
	
	List<User> getAll ();
}
