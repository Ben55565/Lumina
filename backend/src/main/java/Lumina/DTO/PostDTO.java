package Lumina.DTO;

import Lumina.Entities.Visibility;

import java.util.Arrays;

public class PostDTO {
	
	private String id;
	private String title;
	private Visibility visibility;
	private String content;
	private String mediaUrl;
	private String[] tags;
	private long timeStamp;
	private String userId;
	
	public PostDTO () {
	
	}
	
	public PostDTO (String id, String title, Visibility visibility, String content, String mediaUrl, String[] tags, long timeStamp, String userId) {
		this.id = id;
		this.title = title;
		this.visibility = visibility;
		this.content = content;
		this.mediaUrl = mediaUrl;
		this.tags = tags;
		this.timeStamp = timeStamp;
		this.userId = userId;
	}
	
	public PostDTO (String title, Visibility visibility, String content, String mediaUrl, String[] tags, String userId) {
		this.title = title;
		this.visibility = visibility;
		this.content = content;
		this.mediaUrl = mediaUrl;
		this.tags = tags;
		this.timeStamp = System.currentTimeMillis();
		this.userId = userId;
	}
	
	public String getTitle () {
		return title;
	}
	
	public void setTitle (String title) {
		this.title = title;
	}
	
	public Visibility getVisibility () {
		return visibility;
	}
	
	public void setVisibility (Visibility visibility) {
		this.visibility = visibility;
	}
	
	public String getContent () {
		return content;
	}
	
	public void setContent (String content) {
		this.content = content;
	}
	
	public String getMediaUrl () {
		return mediaUrl;
	}
	
	public void setMediaUrl (String mediaUrl) {
		this.mediaUrl = mediaUrl;
	}
	
	public String[] getTags () {
		return tags;
	}
	
	public void setTags (String[] tags) {
		this.tags = tags;
	}
	
	public long getTimeStamp () {
		return timeStamp;
	}
	
	public void setTimeStamp (long timeStamp) {
		this.timeStamp = timeStamp;
	}
	
	public String getUserId () {
		return userId;
	}
	
	public void setUserId (String userId) {
		this.userId = userId;
	}
	
	public String getId () {
		return id;
	}
	
	public void setId (String id) {
		this.id = id;
	}
	
	@Override
	public String toString () {
		return "PostDTO{" + "title='" + title + '\'' + ", visibility=" + visibility + ", content='" + content + '\'' + ", mediaUrl='" + mediaUrl + '\'' + ", tags=" + Arrays.toString(tags) + ", timeStamp=" + timeStamp + ", userId='" + userId + '\'' + '}';
	}
}
