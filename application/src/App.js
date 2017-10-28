import React, { Component } from "react";
/**
 * App 結構
 * - 從公共
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "Taoyuan",
      information: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ city: event.target.value });
  }

  handleSubmit(event) {
    alert(
      "Your favorite flavor is: " +
        `http://ptx.transportdata.tw/MOTC/v2/Bike/Availability/${this.state
          .city}`
    );

    fetch(
      `http://ptx.transportdata.tw/MOTC/v2/Bike/Availability/${this.state
        .city}`,
      { method: "GET" }
    )
      .then(response => {
        return response.json();
      })
      .then(list => {
        this.setState({ information: list });
        console.log(list);
        console.log(JSON.stringify(this.state.information));
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>選擇城市</h1>
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.city} onChange={this.handleChange}>
            <option value="Taipei">台北市</option>
            <option value="NewTaipei">新北市</option>
            <option value="Taoyuan">桃園市</option>
            <option value="Taichung">台中市</option>
          </select>
          <br />
          <input type="submit" value="送出" />
        </form>
        <table border="1">
          <tr>
            <td>站點唯一識別代碼</td>
            <td>站點代碼 </td>
            <td>服務狀態</td>
            <td>可租借車數</td>
            <td>可歸還車數 </td>
            <td> 資料更新日期時間</td>
          </tr>
          {this.state.information.map((list, index) => (
            <tr>
              <td>{list.StationUID}</td>
              <td>{list.StationID}</td>
              <td>{list.ServieAvailable}</td>
              <td>{list.AvailableRentBikes}</td>
              <td>{list.AvailableReturnBikes}</td>
              <td>{list.UpdateTime}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default App;
