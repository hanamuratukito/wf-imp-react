import RequestListInfo from '../../features/request/components/list';
import SearchConditionInfo from '../../features/request/components/searchCondition';

export default function RequestList() {
  return (
    <div className="mt-14 mx-14">
      <SearchConditionInfo />
      <div className="mt-6">
        <RequestListInfo />
      </div>
    </div>
  );
}
