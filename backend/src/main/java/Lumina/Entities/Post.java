package Lumina.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "post")
public class Post {
	
	@Id
	private String id;
	private String userId;
	private String title;
	private String content;
	private String[] tags;
	private Visibility visibility;
	private String mediaUrl;  // optional
	private long timeStamp;
	
	public Post () {
	}
	
	public Post (String userId, String title, String content, String[] tags, Visibility visibility, String mediaUrl, long timeStamp) {
		this.userId = userId;
		this.title = title;
		this.content = content;
		this.tags = tags;
		this.visibility = visibility;
		this.mediaUrl = mediaUrl;
		this.timeStamp = timeStamp;
	}
	
	public String getId () {
		return id;
	}
	
	public void setId (String id) {
		this.id = id;
	}
	
	public String getUserId () {
		return userId;
	}
	
	public void setUserId (String userId) {
		this.userId = userId;
	}
	
	public String getTitle () {
		return title;
	}
	
	public void setTitle (String title) {
		this.title = title;
	}
	
	public String getContent () {
		return content;
	}
	
	public void setContent (String content) {
		this.content = content;
	}
	
	public String[] getTags () {
		return tags;
	}
	
	public void setTags (String[] tags) {
		this.tags = tags;
	}
	
	public Visibility getVisibility () {
		return visibility;
	}
	
	public void setVisibility (Visibility visibility) {
		this.visibility = visibility;
	}
	
	public String getMediaUrl () {
		return mediaUrl;
	}
	
	public void setMediaUrl (String mediaUrl) {
		this.mediaUrl = mediaUrl;
	}
	
	public long getTimeStamp () {
		return timeStamp;
	}
	
	public void setTimeStamp (long timeStamp) {
		this.timeStamp = timeStamp;
	}
	
	@Override
	public String toString () {
		return "Post{" + "id='" + id + '\'' + ", authorId='" + userId + '\'' + ", content='" + content + '\'' + ", tags=" + tags + ", visibility=" + visibility + ", mediaUrl='" + mediaUrl + '\'' + ", timestamp=" + timeStamp + '}';
	}
}
