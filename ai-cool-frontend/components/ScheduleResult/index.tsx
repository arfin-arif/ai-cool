type ScheduleResultProps = {};

const ScheduleResult = ({ renderContent }: ScheduleResultProps) => (
  <div className="">
    {/* <div className="mb-3 font-bold">You are done!</div> */}
    <div className="mb-5">{renderContent}</div>
  </div>
);

export default ScheduleResult;
