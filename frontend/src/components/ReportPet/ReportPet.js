import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ReportPet.css";
import LostPetCard from "./LostPetCard";
import FoundPetCard from "./FoundPetCard";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getAllPets, clearErrors } from "../../actions/petAction";

const ReportPet = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, pets } = useSelector((state) => state.pets);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllPets());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      <section className="enter-infor">
        <div className="container">
          <div className="row">
            <div className="enter-left col-xl-6">
              <h1 className="foundPetTransformHeader xs:mt-ff-20 lg:mt-ff-27 md:mb-10 lg:mb-ff-20">
                <strong>
                  Find Your Lost Pet<strong></strong>
                </strong>
              </h1>
              <h3 style={{ marginTop: "50px" }}>
                We will help you by filling out the form here !
              </h3>
            </div>
            <div className="enter-right col-xl-5">
              <div className="enter-title">
                <h3>Start Your Free Alert</h3>
                <p>
                  Enter your pet's information to instantly start spreading
                  local awareness.
                </p>
              </div>
              <div className="enter-main">
                <h5>
                  Pet status <span>*</span>
                </h5>
                <div
                  className="field-petsubmitform-status required md:w-1/2 md:float-left lg:w-1/2 lg:float-left"
                  style={{ marginBottom: "20px" }}
                >
                  <input type="hidden" name="PetSubmitForm[status]" value="" />
                  <div
                    id="petsubmitform-status"
                    role="radiogroup"
                    aria-required="true"
                  >
                    <label>
                      <input
                        type="radio"
                        name="PetSubmitForm[status]"
                        value="100"
                        data-gtm-form-interact-field-id="1"
                      />
                      <span
                        style={{ color: "black" }}
                        className="pet-form-radio-text"
                      >
                        Lost
                      </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="PetSubmitForm[status]"
                        value="101"
                        data-gtm-form-interact-field-id="0"
                      />
                      <span
                        style={{ color: "black" }}
                        className="pet-form-radio-text"
                      >
                        Found/Stray
                      </span>
                    </label>
                  </div>
                  <div className="label label-danger"></div>
                </div>
                <div className="mt-3 field-petsubmitform-secondary_status">
                  <select
                    id="petsubmitform-secondary_status"
                    className="form-control"
                    name="PetSubmitForm[secondary_status]"
                  >
                    <option value="">Select circumstance...</option>
                    <option value="120">In my possession</option>
                    <option value="121">Sighting (still roaming)</option>
                    <option value="122">Deceased</option>
                  </select>
                  <div className="label label-danger"></div>
                </div>

                <div className="form-item">
                  <div className="form-left">
                    <label className="form-label">
                      Pet Name <span>*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-right">
                    <label className="form-label">
                      Nearest Address Seen <span>*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="form-item">
                  <div className="form-left">
                    <label className="form-label">
                      Contact Email <span>*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-right">
                    <label className="form-label">
                      Contact phone number <span>*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="form-item">
                  <div className="form-image">
                    <label className="form-label">
                      Select image <span>*</span>:
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      name="myImage"
                      accept="image/png, image/gif, image/jpeg"
                    />
                  </div>
                </div>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  style={{ marginBottom: "30px" }}
                />
                <label className="form-check-label">
                  Sign me up for local lost & found pet alerts
                </label>
                <div className="btn-enter">
                  <button className="btn btn-success" type="submit">
                    Find Your Pet Back Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="lost">
        <div className="container">
          <div className="lost-title">
            <h1>Lost</h1>
          </div>
          <div className="row">
            {pets && pets.map((pet) => <LostPetCard key={pet._id} pet={pet} />)}
          </div>
        </div>
      </section>
      <section className="comebackhome">
        <div className="container">
          <div className="reunited-title">
            <h1>Comeback Home</h1>
            <p>Read about recently reunited fur babies.</p>
            <h3>1,000</h3>
            <h6>Pets Reunited And Counting!</h6>
          </div>
          <div className="row">
            <div className="reunited-item col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card">
                <div className="card-img">
                  <img
                    src="./img/success-1.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <img
                    className="badge-lost"
                    src="./img/badge_reunited.png"
                    alt=""
                  />
                </div>

                <div className="card-title">
                  <div className="card-title-left">
                    <h5>Zoe</h5>
                    <p>District 1, Ho Chi Minh City</p>
                  </div>
                  <div className="card-title-right">13 hours ago</div>
                </div>
                <div className="card-content">
                  <p>
                    "We walked into a local gas station/convenience store
                    shortly before it was closing, and the clerk was upset
                    because this lost dog walked in and he couldn't take it home
                    with him"
                  </p>
                </div>
              </div>
            </div>
            <div className="reunited-item col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card">
                <div className="card-img">
                  <img
                    src="./img/success-2.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <img
                    className="badge-lost"
                    src="./img/badge_reunited.png"
                    alt=""
                  />
                </div>
                <div className="card-title">
                  <div className="card-title-left">
                    <h5>Tidus</h5>
                    <p>District 2, Ho Chi Minh City</p>
                  </div>
                  <div className="card-title-right">5 hours ago</div>
                </div>

                <div className="card-content">
                  <p>
                    "Tidus escaped through a door that was opened to get the dog
                    in on a windy night. His wings were clipped, but clipped
                    wings were not enough to keep him from soaring in 35 mph
                    winds"
                  </p>
                </div>
              </div>
            </div>
            <div className="reunited-item col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card">
                <div className="card-img">
                  <img
                    src="./img/success-3.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <img
                    className="badge-lost"
                    src="./img/badge_reunited.png"
                    alt=""
                  />
                </div>
                <div className="card-title">
                  <div className="card-title-left">
                    <h5>Sydney</h5>
                    <p>District 3, Ho Chi Minh City</p>
                  </div>
                  <div className="card-title-right">6 hours ago</div>
                </div>

                <div className="card-content">
                  <p>
                    "I almost hit this dog when it ran out in front of me on
                    dangerous country road. It was raining and there were so
                    many blind spots, I was certain he was going to get hit by
                    someone her"
                  </p>
                </div>
              </div>
            </div>
            <div className="reunited-item col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card">
                <div className="card-img">
                  <img
                    src="./img/success-4.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <img
                    className="badge-lost"
                    src="./img/badge_reunited.png"
                    alt=""
                  />
                </div>
                <div className="card-title">
                  <div className="card-title-left">
                    <h5>Suki</h5>
                    <p>District 4, Ho Chi Minh City</p>
                  </div>
                  <div className="card-title-right">2 weeks ago</div>
                </div>

                <div className="card-content">
                  <p>
                    "My family was visiting for Memorial Day weekend and my
                    younger bro unawares let Charlotte out. I had already gone
                    to bed early for work the next morning and couldn't find
                    her"
                  </p>
                </div>
              </div>
            </div>
            <div className="reunited-item col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card">
                <div className="card-img">
                  <img
                    src="./img/success-5.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <img
                    className="badge-lost"
                    src="./img/badge_reunited.png"
                    alt=""
                  />
                </div>
                <div className="card-title">
                  <div className="card-title-left">
                    <h5>Flynn</h5>
                    <p>District 5, Ho Chi Minh City</p>
                  </div>
                  <div className="card-title-right">3 weeks ago</div>
                </div>

                <div className="card-content">
                  <p>
                    "My fiancé and I were driving home and saw this pup crossing
                    a busy street with a blind turn. We immediately pulled over
                    and my fiancé got out to go retriever her before she could
                    get hurt"
                  </p>
                </div>
              </div>
            </div>
            <div className="reunited-item col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card">
                <div className="card-img">
                  <img
                    src="./img/success-6.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <img
                    className="badge-lost"
                    src="./img/badge_reunited.png"
                    alt=""
                  />
                </div>
                <div className="card-title">
                  <div className="card-title-left">
                    <h5>Sapphire</h5>
                    <p>District 6, Ho Chi Minh City</p>
                  </div>
                  <div className="card-title-right">1 weeks ago</div>
                </div>

                <div className="card-content">
                  <p>
                    "My mom's five-month-old puppy, Phoenix, somehow got out of
                    the yard and ran away one day before we could even react. We
                    searched everywhere for her, but couldn't find her anywhere"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="found">
        <div className="container">
          <div className="found-title">
            <h1>Found</h1>
          </div>
          <div className="row">
            {pets && pets.map((pet) => <FoundPetCard key={pet._id} pet={pet} />)}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ReportPet;
