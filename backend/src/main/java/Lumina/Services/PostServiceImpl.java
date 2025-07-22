package Lumina.Services;

import Lumina.Entities.Post;
import Lumina.Repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {
	
	@Autowired
	private PostRepository postRepository;
	
	@Override
	public List<Post> getAll () {
		return postRepository.findAll();
	}
	
	@Override
	public List<Post> getByUser (String userId) {
		return postRepository.findByUserId(userId);
	}
	
	@Override
	public Post save (Post post) {
		return postRepository.save(post);
	}
	
	@Override
	public void delete (String id) {
		postRepository.deleteById(id);
	}
}
