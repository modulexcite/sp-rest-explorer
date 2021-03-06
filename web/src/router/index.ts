import Vue from 'vue'
import Router from 'vue-router'

import Explorer from '@/components/explorer/Explorer.vue'
import ApiTree from '@/components/api-tree/ApiTree.vue'
import HowItWorks from '@/components/pages/HowItWorks.vue'
import DocsView from '@/components/explorer/docs-area/DocsView.vue'
import BreadCrumb from '@/components/explorer/BreadCrumb.vue'
import FunctionDocs from '@/components/explorer/docs-area/FunctionDocs.vue'
import EntityDocs from '@/components/explorer/docs-area/EntityDocs.vue'
import DiffApi from '@/components/diff-api/DiffApi.vue'
import MonthDiff from '@/components/diff-api/MonthDiff.vue'
import LatestMonthRedirect from '@/components/diff-api/LatestMonthRedirect.vue'
import TypesTree from '@/components/types-tree/TypesTree.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Explorer,
      children: [
        {
          path: '',
          components: {
            docs: DocsView,
            tree: ApiTree
          }
        },
        {
          path: '_api/:apiPath*',
          components: {
            docs: DocsView,
            breadcrumb: BreadCrumb,
            tree: ApiTree
          },
          props: { docs: true, breadcrumb: true, tree: true },
          children: [
            {
              path: '',
              props: { 'entity-docs': true, 'function-docs': true },
              components: {
                'entity-docs': EntityDocs,
                'function-docs': FunctionDocs
              }
            }
          ]
        },
        {
          path: 'entity/:typeName/func/:funcName',
          components: {
            docs: DocsView,
            tree: TypesTree
          },
          props: { docs: true, tree: true },
          children: [
            {
              path: '',
              components: {
                'function-docs': FunctionDocs
              },
              props: { 'function-docs': true }
            }
          ]
        },
        {
          path: 'entity/:typeName',
          components: {
            docs: DocsView,
            tree: TypesTree
          },
          props: { docs: true, tree: true },
          children: [
            {
              path: '',
              components: {
                'entity-docs': EntityDocs
              },
              props: { 'entity-docs': true }
            }
          ]
        },
        {
          path: 'entity',
          components: {
            docs: DocsView,
            tree: TypesTree
          }
        }
      ]
    },
    {
      path: '/how-it-works',
      component: HowItWorks
    },
    {
      path: '/api-diff',
      component: DiffApi,
      props: true,
      children: [
        {
          path: '',
          components: {
            monthDiff: LatestMonthRedirect
          }
        },
        {
          path: ':monthKey',
          components: {
            monthDiff: MonthDiff
          },
          props: { monthDiff: true }
        }
      ]
    }
  ]
})
