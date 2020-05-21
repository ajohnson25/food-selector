# food-selector
[![Build Status](https://travis-ci.org/ajohnson25/food-selector.svg?branch=master)](https://travis-ci.org/ajohnson25/food-selector)

# Examples

<p><a href="https://www.figma.com/proto/QcnpcpCPR9zDqoQrdHv6ol/Food-Selector?embed_host=share&node-id=14%3A16&scaling=min-zoom">Design Markup</a></p>
<p><a href="https://chromative-food-selector.herokuapp.com/">Demo site with latest version</a> - This is on a Heroku free instance so it may take a few seconds to access the page initially.  See <a href="https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping">Dyno sleeping</a> on Heroku for more information on how free instances work.</p>

# Summary

Food selector is a PostgreSQL/Express/React/Node.js application currently under development that asks if a user likes, doesn't like, or hasn't had a food from a list that has a variety of foods.

The project also uses Typescript for static types.

# Hosting images locally
The images in the example and in the source point to a local database and URL with Google Cloud storage, in order to host the images on the webserver you will want to do the following:
1. Download the [Images Archive](https://storage.googleapis.com/triple-nectar-274118.appspot.com/images.zip) and unzip it to a images folder in the base directory of the project
1. Change the Food.tsx like that has const imageProviderURL = foodItems.getSourceURL('gcp'); to const imageProviderURL = foodItems.getSourceURL('local');