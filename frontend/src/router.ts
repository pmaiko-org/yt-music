import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import DefaultLayout from '~/components/layouts/DefaultLayout.vue'
import LandingPage from '~/components/pages/LandingPage.vue'
import MelodiesCommunityPage from '~/components/pages/MelodiesCommunityPage.vue'
import MusicPage from '~/components/pages/MusicPage.vue'
import AboutPage from '~/components/pages/AboutPage.vue'
import TestPage from '~/components/pages/TestPage.vue'
import Test2Page from '~/components/pages/Test2Page.vue'

export type AppRouteRecordRaw = Omit<RouteRecordRaw, 'name' | 'children'> & {
  name: string,
  children?: readonly AppRouteRecordRaw[]
}

type GetRouteName<T extends AppRouteRecordRaw> = T extends { children: readonly AppRouteRecordRaw[] }
  ? T['name'] | GetRouteNames<T['children']>
  : T['name']
type GetRouteNames<T extends readonly AppRouteRecordRaw[]> = GetRouteName<T[number]>

type PathParams<
  Path extends string
> = Path extends `:${infer Param}/${infer Rest}`
  ? Param | PathParams<Rest>
  : Path extends `:${infer Param}`
    ? Param
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    : Path extends `${infer _Prefix}:${infer Rest}`
      ? PathParams<`:${Rest}`>
      : never;

type RequiredParams<Path extends string> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [K in PathParams<Path> as K extends `${infer _}?` ? never : K]: string
};
type ReplaceQuestionMark<T extends string> = T extends `${infer Prefix}?${infer Rest}` ? `${Prefix}${Rest}` : T;
type OptionalParams<Path extends string> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [K in PathParams<Path> as K extends `${infer _}?` ? ReplaceQuestionMark<K> : never]?: string
};

type PathArgs<Path extends string> = {
  [K in keyof RequiredParams<Path>]: string
} & {
  [K in keyof OptionalParams<Path>]: string
};

// type PathArgs<Path extends string> = { [K in RequiredParams<Path>]: string };
type GetRouteParam<T extends AppRouteRecordRaw> = T extends { children: readonly AppRouteRecordRaw[] }
  ? PathArgs<T['path']> | GetRouteParams<T['children']>
  : PathArgs<T['path']>;
type GetRouteParams<T extends readonly AppRouteRecordRaw[]> = GetRouteParam<T[number]>

const routes = [
  {
    path: '',
    name: 'default',
    component: DefaultLayout,
    children: [
      {
        name: 'home',
        path: '',
        component: LandingPage
      },
      {
        name: 'music',
        path: 'music',
        component: MusicPage
      },
      {
        name: 'community',
        path: 'community',
        component: MelodiesCommunityPage
      },
      {
        name: 'about',
        path: 'about',
        component: AboutPage
      },
      {
        name: 'about.id',
        path: 'about/:id?',
        component: AboutPage
      },
      {
        path: 'test',
        name: 'text',
        component: TestPage
      },
      {
        path: 'test2',
        name: 'test2',
        component: Test2Page
      }
    ]
  },
] as const satisfies readonly AppRouteRecordRaw[]

export type Routes = GetRouteNames<typeof routes>
export type Params = GetRouteParams<typeof routes>
// export type Params = GetRouteParam<typeof routes[0]['children'][2]>

const router = createRouter({
  history: createWebHistory(),
  routes: routes as unknown as RouteRecordRaw[],
})

export default router
