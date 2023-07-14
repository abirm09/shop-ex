const Application = ({ handleBecomingASeller, user, modalClose, body }) => {
  return (
    <>
      <div>
        <h2 className="font-inter font-semibold text-green-700">
          Become a seller? Apply now for becoming a seller.
        </h2>
        <label htmlFor="my_modal_6" className="btn mt-5 normal-case font-inter">
          {body}
        </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <div className="font-inters">
              <p>Name : {user.displayName}</p>
              <p>Email : {user.email}</p>
            </div>
            <div className="flex justify-end gap-5 items-center mt-10">
              <button
                className="btn btn-info normal-case"
                onClick={handleBecomingASeller}
              >
                Apply
              </button>
              <div className="modal-action mt-0">
                <label
                  htmlFor="my_modal_6"
                  className="btn normal-case"
                  ref={modalClose}
                >
                  Close!
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Application;
