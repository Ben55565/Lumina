package Lumina.Controllers;

import Lumina.DTO.PostDTO;
import Lumina.DTO.PostResponseDTO;
import Lumina.Entities.Post;
import Lumina.Services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping ("/api/feed")
public class FeedController {
	
	@Autowired
	private PostService postService;
	@Autowired
	private MessageSource messageSource;
	
	@GetMapping ("/get-all-posts")
	public List<Post> getAllPosts () {
		return postService.getAll();
	}
	
	@PostMapping ("/new-post")
	public PostResponseDTO addNewPost (@RequestBody PostDTO post, Locale locale) {
		Post toSave;
		if (post.getId() != null) {
			Post existing = postService.findById(post.getId());
			if (existing != null) {
				existing.setFieldsValues(post);
				toSave = postService.save(existing);
				return new PostResponseDTO(toSave, "success", messageSource.getMessage("postUpdateSuccess", null, locale));
			}
		}
		else {
			toSave = postService.save(new Post(post.getUserId(), post.getTitle(), post.getContent(), post.getTags(), post.getVisibility(), post.getMediaUrl(), post.getTimeStamp()));
			if (toSave != null) {
				return new PostResponseDTO(toSave, "success", messageSource.getMessage("postSaveSuccess", null, locale));
			}
		}
		return new PostResponseDTO(null, "error", messageSource.getMessage("postSaveError", null, locale));
	}
	
	@DeleteMapping ("/delete-post/{postId}")
	public PostResponseDTO deleteNewPost (@PathVariable String postId, Locale locale) {
		boolean deleted = !postService.delete(postId);
		if (deleted) {
			return new PostResponseDTO(null, "success", messageSource.getMessage("postDeleteSuccess", null, locale));
		}
		else {
			return new PostResponseDTO(null, "error", messageSource.getMessage("postDeleteError", null, locale));
		}
		
	}
}
