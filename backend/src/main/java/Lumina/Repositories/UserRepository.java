package Lumina.Repositories;

import Lumina.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Integer> {
	
	boolean existsByEmail (String email);
	
	boolean existsByDisplayName (String displayName);
	
	boolean existsByPhoneNum (String phoneNum);
}
