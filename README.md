<h1>SpotiSearch – Music Artist & Events Finder</h1>
<p>SpotiSearch is a web application that allows users to search for music artists, view their top tracks, albums, and upcoming events. The app fetches data from external APIs to provide up-to-date information about artists and their music.</p>
<h2>Features</h2>
<ul>
  <li>Search for artists and retrieve their details</li>
  <li>View top tracks and albums of an artist</li>
  <li>Check upcoming events for an artist</li>
  <li>Responsive design for desktop and mobile</li>
</ul>
<h2>Installation & Setup</h2>
<h3>1. Clone the Repository</h3>
<pre><code>git clone https://github.com/kasiarak/SpotiSearch.git
cd SpotiSearch</code></pre>
<h3>2. Install Dependencies</h3>
<p>Ensure you have <strong>Node.js</strong> installed, then install the required dependencies:</p>
<pre><code>npm install</code></pre>
<h3>3. Set Up Environment Variables</h3>
<p>Create a <code>.env</code> file in the project and add your environment variables:</p>
<pre><code>NEXT_PUBLIC_API_URL=&lt;your-api-url&gt;
SPOTIFY_CLIENT_ID=&lt;your-spotify-client-id&gt;
SPOTIFY_CLIENT_SECRET=&lt;your-spotify-client-secret&gt;
PORT=&lt;port number&gt;
TICKETMASTER_API_KEY=&lt;your-ticketmaster-api-key&gt;
</code></pre>
<h2>Running the Application</h2>
<p>To start the application locally, run:</p>
<pre><code>npm run dev</code></pre>
<p>The app will be available at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.</p>
<h2>API Usage</h2>
    <ul>
        <li><code>/getArtistDetails</code> – Fetch artist name, image, followers, and genres</li>
        <li><code>/getTopTracks</code> – Retrieve the artist’s top tracks</li>
        <li><code>/getArtistAlbums</code> – Fetch albums and release dates</li>
        <li><code>/getEvents</code> – Get upcoming concerts and events</li>
    </ul>
<h2>Technologies Used</h2>
<ul>
  <li><strong>Frontend:</strong> Next.js (React, CSS Modules)</li>
  <li><strong>Backend:</strong> Node.js</li>
  <li><strong>API:</strong> Spotify API for music data, Ticketmaster API for events</li>
</ul>
<h1>Screenshots</h1>
<img src="https://github.com/user-attachments/assets/c984e185-0343-4785-9c8e-4ddef774aced"/>
<img src="https://github.com/user-attachments/assets/03692a6b-82e1-4da1-b8e0-0d8da54941ef"/>
<img src="https://github.com/user-attachments/assets/8c8b4a34-6b2a-4f82-b0b5-791e529eae8f"/>
<img src="https://github.com/user-attachments/assets/624fe3ca-d177-46ed-b10d-1867c5fc1c5b"/>


