Jekyll::Hooks.register [:pages, :posts], :post_render do |doc|
  if doc.output_ext == '.html'
    doc.output = redact(doc.output) unless doc.output.nil?
  end
end

def redact(input)
  # Regular expression to find ///TEXT///
  input.gsub(%r{<p>(.*?)///(.*?)///(.*?)</p>}) do |match|
    # Capture the text inside ///...///
    pre_text = $1 # Text before the redaction
    text_to_redact = $2 # Text to redact
    post_text = $3 # Text after the redaction
    # Replace each character with a block character
    redacted_text = '█' * text_to_redact.length
    # Wrap the entire content in a <p class="redacted">
    "<p class=\"redacted\">#{pre_text}#{redacted_text}#{post_text}</p>"
  end
end

puts 'RedactHook plugin loaded'
