package Lumina.Services;

import Lumina.Entities.Post;

import java.util.List;

public interface PostService {
	
	public List<Post> getAll();
	
	public List<Post> getByUser(String userId);
	
	public Post save (Post post);
	
	public void delete (String id);
	
}
