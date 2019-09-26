    server {
        server_name web-cms.thelarsson.com;

	location / {
		proxy_pass http://localhost:3000;
		proxy_set_header Host $host;
	}
    
    listen [::]:443 ssl; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/web-cms.thelarsson.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/web-cms.thelarsson.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
    server {
    if ($host = web-cms.thelarsson.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80;
        listen [::]:80;

        server_name web-cms.thelarsson.com;
    return 404; # managed by Certbot


}
