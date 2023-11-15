# TransitTrackr

## Project Overview and Task
TransitTrackr is a real-time public transport tracking web application that allows users to view and track the live locations of public transportation vehicles on a map. This application focuses on the San Jose, California area and simulates vehicle movement by generating routes with random coordinates.

This part of documentation covers making the frontend of the project up and working with the backend.

---

## Getting Started

### Prerequisites
- Node.js and npm

### Installation
1. **Change the directory:**
   ```sh
   cd tracker-web
   ```
2. **Install Node.js dependencies:**
   ```sh
   npm install
   ```

3. **Start the React project:**
   ```sh
   npm start
   ```
   This will create an initial route with random coordinates and start the Node.js server on `https://localhost:443`. Note that the server will not start without a valid `.env` file. 
   
   You can also run create another random route by running `npm run generate` again.


## Using the Application
- Open the application in a web browser.
- Real-time vehicle movement is simulated using random coordinates in the San Jose area.
- You can view different routes, each generated with random waypoints.
- You can start all the routes by clicking the `Start All` button.
- You can restart all the routes by clicking the `Restart All` button. Or you can restart a certain route by clicking the `Restart` button on the route card.

<p align="left" style="margin-top:1rem; border-radius:16px">
  <img width="720" height="auto" alt="screenshots/desktopMode" src="../screenshots/mainpage.png">
</p>


## Contributing
Contributions to the project are welcome! Please follow the standard fork and pull request workflow.

## License
This project is licensed under the [MIT License](LICENSE.md).

## Contact
- Project Link: [https://github.com/your-repository/TransitTrackr](https://github.com/your-repository/TransitTrackr)
- Author - [mehmetakifakkus](https://mehmetakifakkus.github.io)
  
---

This README provides a comprehensive overview of the frontend React project and how to use it. For more information about the backend Node.js project, please refer to the [backend README](../README.md).

## References
- [Simple explanation of the web socket](https://www.wallarm.com/what/a-simple-explanation-of-what-a-websocket-is#:~:text=WebSocket%20uses%20a%20unified%20TCP,completed%2C%20the%20connection%20breaks%20automatically)
- [Getting started with React, Express, and Socket.io](https://medium.com/@vrinmkansal/getting-started-with-react-express-and-socket-io-658bbd441a9a)
- [Leaflet and React Tutorial](https://www.youtube.com/watch?v=WKaUkmQhRDY)
- [Creating Models in Mongoose](https://mongoosejs.com/docs/models.html)
- [Mongoose Queries](https://mongoosejs.com/docs/queries.html)