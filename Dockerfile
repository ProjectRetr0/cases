FROM nginx:alpine

COPY index.html recent.html /usr/share/nginx/html/
COPY images/ /usr/share/nginx/html/images/
COPY js/ /usr/share/nginx/html/js/
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
