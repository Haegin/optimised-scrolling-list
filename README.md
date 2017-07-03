# Scrolling a Large List

This takes some simple but incomplete code for displaying a scrollable list of
names, loaded from an external API and optimises it for performance by adding
a cache and batching requests together. To improve the user experience I also
add a spinner to provide a visual indication that data is being loaded.

## Running the app

You'll need to install dependencies before you can run the app. This is done
using Yarn: `yarn install`.

Run `yarn run start` to run the app. This runs using the webpack dev server and
will open your browser for you.

## The Approach

Starting from the original code in the initial commit (b98049) I first added an
API to test against using NodeJS, Express and Faker.

The starting code was incomplete, so I built out a simple app with Webpack and
a top level react component just loading the list on a page by itself.

Originally, the List component passed the update method down to each Row, so
the Row was responsible for fetching information from the store, or from the
server if it was already loaded. To simplify the Row component, and make it
easier to reuse elsewhere I changed it to just take in the number and name that
it needed to render. The List took on the responsibility of rendering each row
with the correct information.

With this, the application was working, fetching data from the server and
rendering the rows accordingly. I then added a Cache component around the List.
This took the same fetchData prop from the App component and passed a new
function down to the List with the same interface, but now looking up data in
the cache rather than always hitting the server for data.

With the cache in place, repeat requests were much faster, but scrolling
through quickly still hits the server with lots of requests. To fix this,
I added a Batcher component. This changes the loadData prop passed to the
cache, so when data is fetched from the server it pauses for a short time
before making the request. If an additional request comes in during this time,
it adds that range to the range already being requested. When the timer expires
a single request is made for all the data that has been requested.

I also added a loading spinner to the Row so it shows users that more data is
being loaded while users are waiting.

For more information about each step as I implemented it look at the commits.
