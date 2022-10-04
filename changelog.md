---
layout: other
title: Changelog
---

<h2>Changelog</h2>
<hr>
  {% for post in site.posts %}
  {% if post.categories contains "changelog" %}
<li id="post">
  <h2>
    <a href="{{ post.url | absolute_url}}">
      {{ post.title }}
    </a>
    {{ post.date | date_to_string }}
  </h2>
  <p>
    {{ post.content | truncatewords: 50 }}
    <a href="{{ post.url | absolute_url}}">
      Read More >>
    </a>
  </p>
  <hr>
</li>
{% endif %}
{% endfor %}
