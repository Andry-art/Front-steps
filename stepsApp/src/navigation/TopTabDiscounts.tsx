import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Discounts from '../screens/discounts/discounts';
import Transactions from '../screens/discounts/transactions';


const TopTabDiscounts = createMaterialTopTabNavigator();

function DiscountsTopTabs() {
  return (
    <TopTabDiscounts.Navigator>
      <TopTabDiscounts.Screen name="discounts" component={Discounts} />
      <TopTabDiscounts.Screen name="transactions" component={Transactions} />
    </TopTabDiscounts.Navigator>
  );
}

export default DiscountsTopTabs;