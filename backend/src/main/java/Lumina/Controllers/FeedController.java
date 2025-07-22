package Lumina.Controllers;

import Lumina.DTO.PostDTO;
import Lumina.Entities.Post;
import Lumina.Services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@RestController
@RequestMapping ("/api/feed")
public class FeedController {
	
	@Autowired
	private PostService postService;
	
	@GetMapping("/get-all-posts")
	public List<Post> getAllPosts () {
		return postService.getAll();
	}
	
	@PostMapping("/new-post")
	public Post addNewPost (@RequestBody PostDTO post) {
		Post postToSave = new Post(post.getUserId(), post.getTitle(), post.getContent(), post.getTags(), post.getVisibility(), post.getMediaUrl(), post.getTimeStamp());
		return postService.save(postToSave);

	}
}
