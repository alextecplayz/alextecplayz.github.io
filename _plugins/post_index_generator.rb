module Jekyll
  class PostIndexGenerator < Generator
    safe true

    def generate(site)
      site.posts.docs.each_with_index do |post, index|
        post.data['index'] = index + 1
      end
    end
  end
end
