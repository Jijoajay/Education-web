from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.String(255), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255), nullable=False)
    tokens = db.Column(db.String(255), nullable=False)
    user_courses = db.relationship('UserCourse', back_populates='user')
    user_info = db.relationship("UserInfo", back_populates="user")
    favourite_info = db.relationship("FavouriteInfo", back_populates="user")
    search_info = db.relationship("SearchInfo", back_populates="user")
    message = db.relationship("Message", back_populates="user")
    reply = db.relationship("Reply", back_populates="user")
    def json(self):
        user_info_data = None
        if isinstance(self.user_info, list):
            user_info_data = [info.json() for info in self.user_info]   
        return{
            "id":self.id,
            "name":self.name,
            "email":self.email,
            "tokens":self.tokens,
            "role":"student",
            "user_info":user_info_data,
        }
    
        
class Course(db.Model):
    __tablename__ = "course"
    id = db.Column(db.String, primary_key=True)
    admin_id = db.Column(db.String, db.ForeignKey("admin.id"))
    name = db.Column(db.String(255))
    author = db.Column(db.String(255))
    img = db.Column(db.String(255))
    newPrice = db.Column(db.Float)
    oldPrice = db.Column(db.Float)
    courseOffers = db.Column(db.String(255))
    category = db.Column(db.String(255))
    # user = db.relationship("User",back_populates='course')
    # Relationship with WhatYouLearn and VideoContent models
    whatYouLearn = db.relationship('WhatYouLearn', backref='course', lazy=True,  cascade='all, delete-orphan')
    videoContent = db.relationship('VideoContent', backref='course', lazy=True, cascade='all, delete-orphan')
    user_courses = db.relationship("UserCourse", back_populates="course")
    favourite_info = db.relationship("FavouriteInfo",back_populates="course")
    admin = db.relationship("Admin",back_populates="course")
    message = db.relationship("Message", back_populates="course")
    def json(self):
        return {
            'id': self.id,
            "category": self.category,
            "admin_id":self.admin_id,
            'name': self.name,
            'author': self.author,
            'img': self.img,
            'oldPrice': self.oldPrice,
            'newPrice': self.newPrice,
            'courseOffers': self.courseOffers,
            'whatYouLearn': [
                {"title":learn.title} for learn in self.whatYouLearn
                ],
            'videoContent': [{
                'title': content.title,
                'subtitle': [{'content': subtitle.content, 'videoLink': subtitle.videoLink , "videoDescription": subtitle.videoDescription} for subtitle in content.subtitle]
            } for content in self.videoContent]
        }

class WhatYouLearn(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)

class VideoContent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    # Relationship with Subtitle model
    subtitle = db.relationship('Subtitle', backref='video_content', lazy=True)
    # def json(self):
    #     return {
    #         'id': self.id,
    #         'title': self.title,
    #         'video_links': [subtitle.video_link for subtitle in self.subtitle],
    #     }
class Subtitle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255))
    videoLink = db.Column(db.String(255),nullable=True)
    videoDescription = db.Column(db.String(255), nullable=True)
    videoContent_id = db.Column(db.Integer, db.ForeignKey('video_content.id'))

class UserCourse(db.Model):
    __tablename__ = "user_courses"
    id = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey('user.id'), nullable=True)
    admin_id = db.Column(db.String, db.ForeignKey("admin.id"),nullable=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    user = db.relationship('User', back_populates='user_courses')
    admin = db.relationship('Admin', back_populates='user_courses')
    course = db.relationship('Course', back_populates='user_courses')
    progress = db.Column(db.Integer, default=0)
    def json(self):
        return {
            "user_course_id": self.id,
            "user_id": self.user_id,
            "admin_id": self.admin_id,
            "course_id": self.course_id,
            "course": self.course.json(),
            "progress": self.progress,
            "admin":self.admin.json() if self.admin else None,
            "user":self.user.json() if self.user else None,
        }

class UserInfo(db.Model):
    __tablename__ = "user_info"
    id = db.Column(db.String, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String)
    Headline = db.Column(db.String)
    phone_number = db.Column(db.String)
    website_link = db.Column(db.String)
    youtube_link = db.Column(db.String)
    instagram_link = db.Column(db.String)
    linkedin_link = db.Column(db.String)
    profile_img = db.Column(db.String)
    user_id = db.Column(db.String, db.ForeignKey('user.id'),nullable=True)
    user = db.relationship('User', back_populates='user_info')
    def json(self):
        return {
            "first_name": self.first_name,
            "last_name": self.last_name,
            "Headline": self.Headline,
            "phone_number": self.phone_number,
            'website_link': self.website_link,
            'instagram_link': self.instagram_link,
            'youtube_link': self.youtube_link,
            'linkedin_link': self.linkedin_link,
            'profile_img':self.profile_img,
            "user_id":self.user_id,
        }
class AdminInfo(db.Model):
    __tablename__ = "admin_info"
    id = db.Column(db.String, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String)
    Headline = db.Column(db.String)
    phone_number = db.Column(db.String)
    website_link = db.Column(db.String)
    youtube_link = db.Column(db.String)
    instagram_link = db.Column(db.String)
    linkedin_link = db.Column(db.String)
    profile_img = db.Column(db.String)
    admin = db.relationship("Admin", back_populates="admin_info")
    admin_id = db.Column(db.String, db.ForeignKey("admin.id"),nullable=True)
    def json(self):
        return {
            "first_name": self.first_name,
            "last_name": self.last_name,
            "Headline": self.Headline,
            "phone_number": self.phone_number,
            'website_link': self.website_link,
            'instagram_link': self.instagram_link,
            'youtube_link': self.youtube_link,
            'linkedin_link': self.linkedin_link,
            'profile_img':self.profile_img,
            "admin_id":self.admin_id
        }
        
class FavouriteInfo(db.Model):
    __tablename__ = "favourite_info"
    id = db.Column(db.String,primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey("user.id"),nullable=False)
    course_id = db.Column(db.String, db.ForeignKey("course.id"))
    course = db.relationship("Course",back_populates="favourite_info")
    user = db.relationship("User", back_populates="favourite_info")
    def json(self):
        return {
            "course": self.course.json(),
            'course_id':self.course_id,
            "user_id":self.user_id
        }

class Admin(db.Model):
    __tablename__ = "admin"
    id = db.Column(db.String(255), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255), nullable=False)
    tokens = db.Column(db.String(255), nullable=False)
    course = db.relationship("Course", back_populates="admin")
    message = db.relationship("Message", back_populates="admin")
    reply = db.relationship("Reply", back_populates="admin")
    admin_info = db.relationship("AdminInfo", back_populates="admin")
    user_courses = db.relationship("UserCourse", back_populates="admin")
    def json(self):
        # tokens_data = []
        # if isinstance(self.tokens, list):
        #     tokens_data = self.tokens
        admin_info_data = []
        if isinstance(self.admin_info, list):
            admin_info_data = [info.json() for info in self.admin_info]

        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "tokens": self.tokens,
            "role": "admin",
            "user_info": admin_info_data
        }
        
class SearchInfo(db.Model):
    __tablename__ = "search_info"
    id = db.Column(db.String, primary_key=True)
    search_result = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.ForeignKey("user.id"), nullable=False)
    user = db.relationship("User", back_populates= "search_info")  
    def json(self):
        return {
            "id":self.id,
            "search_result": self.search_result,
        }
        
class Message(db.Model):
    __tablename__ = "message"
    id = db.Column(db.String, primary_key=True)
    message = db.Column(db.String(255), nullable=False)
    img = db.Column(db.String(255))
    user_id = db.Column(db.ForeignKey("user.id"),nullable=True)
    admin_id = db.Column(db.ForeignKey("admin.id"),nullable=True)
    user = db.relationship("User", back_populates= "message")  
    admin = db.relationship("Admin", back_populates = "message")
    reply = db.relationship("Reply", back_populates = "message")
    course_id = db.Column(db.String, db.ForeignKey("course.id"))
    course = db.relationship("Course", back_populates="message")   
    def json(self):
        return{
            "id":self.id,
            "message":self.message,
            "admin":self.admin.json() if self.admin else None,
            "user":self.user.json() if self.user else None,
            "img":self.img,
            "course_id":self.course_id
        }
        
class Carousel(db.Model):
    id = db.Column(db.String, primary_key=True)
    img = db.Column(db.String(255), nullable=False)
    alt = db.Column(db.String(255), nullable=False)
    def json(self):
        return{
            "id": self.id,
            "img":self.img,
            "alt":self.alt
        }

class Reply(db.Model):
    __tablename__ = "reply"
    user_id = db.Column(db.ForeignKey("user.id"),nullable=True)
    admin_id = db.Column(db.ForeignKey("admin.id"),nullable=True)
    id = db.Column(db.String, primary_key=True)
    reply = db.Column(db.String(255), nullable=False)
    message_id = db.Column(db.String, db.ForeignKey("message.id"))
    message = db.relationship("Message", back_populates="reply")
    user = db.relationship("User", back_populates="reply")
    admin = db.relationship("Admin", back_populates="reply")
    def json(self):
        return{
            "id":self.id,
            "reply":self.reply,
            "admin":self.admin.json() if self.admin else None,
            "user":self.user.json() if self.user else None,
            "message_id":self.message_id
        }
    
