package Lumina.DTO;

import Lumina.Entities.Post;

public class PostResponseDTO {
	
	private Post post;
	private String result;
	private String info;
	
	public PostResponseDTO () {
	
	}
	
	public PostResponseDTO (Post post, String result, String info) {
		this.post = post;
		this.result = result;
		this.info = info;
	}
	
	public Post getPost () {
		return post;
	}
	
	public void setPost (Post post) {
		this.post = post;
	}
	
	public String getResult () {
		return result;
	}
	
	public void setResult (String result) {
		this.result = result;
	}
	
	public String getInfo () {
		return info;
	}
	
	public void setInfo (String info) {
		this.info = info;
	}
}
