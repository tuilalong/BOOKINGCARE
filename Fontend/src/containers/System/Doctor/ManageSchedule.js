import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkScheduleDoctor } from "../../../services/userService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllHours();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.allHours !== this.props.allHours) {
      let data = this.props.allHours;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }

      this.setState({
        rangeTime: data,
      });
    }

    // if (prevProps.language !== this.props.language) {
    //   let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
    //   this.setState({
    //     listDoctors: dataSelect,
    //   });
    // }
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.firstName} ${item.lastName}`;
        let labelEn = `${item.lastName} ${item.firstName}`;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }

    return result;
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleBtnTime = (time) => {
    console.log("check time click:", time);
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });

      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  handleSaveInfo = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Vui l??ng ch???n ng??y !");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Vui l??ng ch???n b??c s?? !");
      return;
    }

    // let formatedDate = moment(currentDate).unix();
    let formatedDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          console.log("check schedule", schedule, index, selectedDoctor);
          let object = {};
          object.doctorID = selectedDoctor.value;
          object.date = formatedDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Vui l??ng ch???n th???i gian ????? kh??m!");
        return;
      }
    }
    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorID: selectedDoctor.value,
      formatedDate: formatedDate,
    });
    if (res && res.data.errCode === 0) {
      toast.success("Th??m th??ng tin l???ch kh??m th??nh c??ng !");
    } else {
      toast.error("Th??m l???ch kh??m th???t b???i !");
      console.log("brodev check res ERROR: saveBulkScheduleDoctor", res);
    }

    console.log("check: result", result);
  };

  render() {
    // console.log("check props", this.props);
    let { rangeTime } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    console.log("brodev checking state", rangeTime);
    return (
      <React.Fragment>
        <div className="manageSchedule-container">
          <div className="admin-title">
            <FormattedMessage id="manage-schedule.title" />
          </div>

          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-doctor" />
                </label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={this.handleChangeSelect}
                  options={this.state.listDoctors}
                />
              </div>
              <div className="col-3 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-date" />
                </label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleOnChangeDatePicker}
                  value={this.state.currentDate}
                  minDate={yesterday}
                />
              </div>
              <div className="col-12 date-time">
                <label>Ch???n Th???i Gian Kh??m</label>
                <div>
                  {rangeTime &&
                    rangeTime.length > 0 &&
                    rangeTime.map((item, index) => {
                      return (
                        <button
                          className={
                            item.isSelected === true
                              ? "btn-schedule active"
                              : "btn-schedule"
                          }
                          key={index}
                          onClick={() => this.handleBtnTime(item)}
                        >
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </button>
                      );
                    })}
                </div>
              </div>
              <button
                className="btn-saveInfo"
                onClick={() => this.handleSaveInfo()}
              >
                <FormattedMessage id="manage-schedule.save-info" />
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allHours: state.admin.allHours,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllHours: () => dispatch(actions.fetchAllHours()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
