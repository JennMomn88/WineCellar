import AnalyticsPanel from '../components/AnaliticsPanel/AnalyticsPanel';
import Welcome from '../components/Welcome/Welcome';
import { PageLayout } from '../components/PageLayout';

import LatestAddedWines from '../components/LatestAddedWines/LatestAddedWine';
import LatestAddedComments from '../components/LatestAddedComments/LatestAddedComments';
import TabComponent from '../components/LabelInformation/TabComponent';

function DashboardPage() {
  return (
    <PageLayout>
      <div className="container grid gap-6 grid-cols-2">
        <div>
          <Welcome />
          <AnalyticsPanel />
        </div>
        <LatestAddedWines />
        <TabComponent />
        <LatestAddedComments />
      </div>
    </PageLayout>
  );
}

export default DashboardPage;
