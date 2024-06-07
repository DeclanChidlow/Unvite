---
layout: other
title: Support
---

<h2>Support</h2>
<hr>
  {% for post in site.posts %}
  {% if post.categories contains "support" %}
<li id="post">
  <h2>
    <a href="/Unvite/{{ post.url | absolute_url}}">
      {{ post.title }}
    </a>
  </h2>
  <p>
    {{ post.content | strip_html | truncatewords: 50 }}
    <a href="/Unvite/{{ post.url | absolute_url}}">
      Read More >>
    </a>
  </p>
  <hr>
</li>
{% endif %}
{% endfor %}
