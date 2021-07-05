
app.factory("myBlogFactory", function($http) {
    return {

        allBlogs : function() {
            return $http.get("/admin/blogs");
        },

        editBlog : function(id) {
            return $http.get("/admin/blog/" + id + "/edit");
        },

        updateBlog : function(blog) {
            return $http.get("/admin/blog/" + blog._id + "/update", blog);
        },

        deleteBlog : function(id) {
            return $http.get("/admin/blog/" + id + "/delete");
        },

        createBlog : function(blog) {
            return $http.get("/admin/blog/create/" + id);
        }
    }
})