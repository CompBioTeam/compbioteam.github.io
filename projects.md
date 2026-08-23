---
layout: layout.njk
title: Projects
---
## Projects

{%for member in projects.projects%}
<div class="card">
{% if member.photo %}
<div class="card-image float-left">
<img src="{{ member.photo | url }}" class="img-w-responsive">
</div>
{% endif %}
<div class="card-content">
    <div class="card-header">
    <div class="card-title h3">{{member.name}}</div>
    </div>
    <div class="card-body">
        {{member.about}}
    </div>
    <div class="card-footer project-actions">
    <a href="{{member.github}}" class="btn btn-primary">GitHub</a>{% if member.website %}<a href="{{member.website}}" class="btn btn-page">Website</a>{% endif %}
    </div>
</div>
</div>
{%endfor%}

