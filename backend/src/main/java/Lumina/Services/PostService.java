package Lumina.Services;

import Lumina.Entities.Post;

import java.util.List;

public interface PostService {
	
	public List<Post> getAll(String userId);
	
	public List<Post> getByUser(String userId);
	
	public Post save (Post post);
	
	public boolean delete (String id);
	
	public Post findById (String id);
	
}
