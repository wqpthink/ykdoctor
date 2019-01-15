import AttachBasicLayout from "_layout/AttachBasicLayout";
import AttachHeadAndSideLayout from "_layout/AttachHeadAndSideLayout";

import NotFound from "_common/notfound/NotFound";
import Login from '_page/login/Login';
import Home from '_page/home/Home';
import PaymentImport from '_page/paymentimport/PaymentImport';
import PolicyQuery from '_page/policyquery/PolicyQuery';
import PolicyRecord from '_page/policyrecord/PolicyRecord';
import PolicyHandle from '_page/policyhandle/PolicyHandle';
import IdentityImport from '_page/identityimport/IdentityImport';
import PolicyHandle1 from '_page/policyhandle/PolicyHandle';
import InformationClass from '_page/informationclass/InformationClass';


/**
 * 页面路由配置
 * @type {Array[object]}
 */
const routeConf = [
    {
        path: '/',
        layout: AttachHeadAndSideLayout,
        component: Home
    },
    {
        path: '/home',
        layout: AttachHeadAndSideLayout,
        component: Home
    },
    {
        path: '/login',
        layout: AttachBasicLayout,
        component: Login
    },
    {
        path: '/paymentimport',
        layout: AttachHeadAndSideLayout,
        component: PaymentImport
    },
    {
        path: '/policyquery',
        layout: AttachHeadAndSideLayout,
        component: PolicyQuery
    },
    {
        path: '/policyrecord',
        layout: AttachHeadAndSideLayout,
        component: PolicyRecord
    },
    {
        path: '/policyhandle',
        layout: AttachHeadAndSideLayout,
        component: PolicyHandle
    },
    {
        path: '/informationclass',
        layout: AttachHeadAndSideLayout,
        component: InformationClass
    },
    {
        path: '/identityimport',
        layout: AttachHeadAndSideLayout,
        component: IdentityImport
    },
    {
        path: '*',
        layout: AttachBasicLayout,
        component: NotFound
    }
];

export default routeConf;
