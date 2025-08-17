package Lumina.Repositories;

import Lumina.Entities.Post;
import Lumina.Entities.Visibility;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post, String> {
	List<Post> findByUserId(String userId);
	
	List<Post> findByUserIdOrVisibilityNot(String userId, Visibility visibility);
}
