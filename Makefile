default: install

all: install build

h help:
	@grep '^[a-z]' Makefile


install:
	bundle config set --local path vendor/bundle
	bundle install


# Serve on subpath, as on GitHub Pages project site.
s serve:
	bundle exec jekyll serve --trace --livereload

# Serve on root, as on GitHub Pages user site or Netlify.
r serve-root:
	bundle exec jekyll serve --baseurl '' --trace --livereload


build:
	JEKYLL_ENV=production bundle exec jekyll build --trace
