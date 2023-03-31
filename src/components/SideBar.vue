<template>
    <div class="sidebar">
        <RouterLink :to="{ name: routeNames.Home }" custom v-slot="{ navigate }">
            <div @click="navigate" class="sidebar__home">Home</div>
        </RouterLink>
        <div class="sidebar__profile">
            <RouterLink :to="{ name: routeNames.Profile}">
                <div class="sidebar__user">
                    <p>hodame</p>
                    <img src="https://cdn-icons-png.flaticon.com/512/727/727399.png" alt="userLogo">
                </div>
            </RouterLink>
            <ul class="sidebar__profile-list">
                <li class="sidebar__profile-wishlist">
                    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z"
                                stroke="#ff334d" stroke-width="2" />
                        </g>
                    </svg>
                    <p>Wishlist</p>
                </li>
                <li class="sidebar__profile-collection">
                    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M17 8C18.8856 8 19.8284 8 20.4142 8.58579C21 9.17157 21 10.1144 21 12L21 16C21 17.8856 21 18.8284 20.4142 19.4142C19.8284 20 18.8856 20 17 20L16 20L8 20L7 20C5.11438 20 4.17157 20 3.58579 19.4142C3 18.8284 3 17.8856 3 16L3 12C3 10.1144 3 9.17157 3.58579 8.58579C4.17157 8 5.11438 8 7 8L8 8L16 8L17 8Z"
                                stroke="#ff334d" stroke-width="2" stroke-linejoin="round" />
                            <path
                                d="M6 8V5.71429C6 4.76751 6.76751 4 7.71429 4V4H16.2857V4C17.2325 4 18 4.76751 18 5.71429V8"
                                stroke="#ff334d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                    </svg>
                    <p>My collection</p>
                </li>
            </ul>
        </div>
        <ul class="sidebar__releases">
            <span>New releases</span>
            <li class="sidebar__last-30">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                    <g id="SVGRepo_iconCarrier">
                        <g id="Calendar / Calendar_Days">
                            <path id="Vector"
                                d="M8 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V8M8 4H16M8 4V2M16 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V8M16 4V2M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8H20M16 16H16.002L16.002 16.002L16 16.002V16ZM12 16H12.002L12.002 16.002L12 16.002V16ZM8 16H8.002L8.00195 16.002L8 16.002V16ZM16.002 12V12.002L16 12.002V12H16.002ZM12 12H12.002L12.002 12.002L12 12.002V12ZM8 12H8.002L8.00195 12.002L8 12.002V12Z"
                                stroke="#ff334d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                    </g>
                </svg>
                <p>Last 30 days</p>
            </li>
            <li class="sidebar__this-week">
                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M5.926 20.574a7.26 7.26 0 0 0 3.039 1.511c.107.035.179-.105.107-.175-2.395-2.285-1.079-4.758-.107-5.873.693-.796 1.68-2.107 1.608-3.865 0-.176.18-.317.322-.211 1.359.703 2.288 2.25 2.538 3.515.394-.386.537-.984.537-1.511 0-.176.214-.317.393-.176 1.287 1.16 3.503 5.097-.072 8.19-.071.071 0 .212.072.177a8.761 8.761 0 0 0 3.003-1.442c5.827-4.5 2.037-12.48-.43-15.116-.321-.317-.893-.106-.893.351-.036.95-.322 2.004-1.072 2.707-.572-2.39-2.478-5.105-5.195-6.441-.357-.176-.786.105-.75.492.07 3.27-2.063 5.352-3.922 8.059-1.645 2.425-2.717 6.89.822 9.808z"
                            fill="#FF334D" />
                    </g>
                </svg>
                <p>This week</p>
            </li>
        </ul>
        <ul class="sidebar__top">
            <span>Top</span>
            <li class="sidebar__best-of-year">
                <svg fill="#ff334d" height="25" width="25" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                    <g id="SVGRepo_iconCarrier">
                        <g>
                            <g>
                                <path
                                    d="M476.624,55.698C468.257,22.9,440.129,0,408.219,0c-0.005,0-0.012,0-0.017,0h-40.814H144.609H103.8 c-0.006,0-0.011,0-0.017,0c-31.91,0-60.039,22.902-68.406,55.696c-4.265,16.718-5.249,43.19,14.293,74.356 c14.927,23.808,39.204,45.76,72.2,65.384c4.093,62.186,50.632,112.966,110.857,123.569v50.975h-72.204 c-12.853,0-23.273,10.42-23.273,23.273v95.474c0,12.853,10.42,23.273,23.273,23.273h190.954c12.853,0,23.273-10.42,23.273-23.273 v-95.476c0-12.853-10.42-23.273-23.273-23.273h-72.204v-50.932c60.38-10.511,107.062-61.414,111.096-123.75 c32.877-19.586,57.071-41.492,71.962-65.243C481.873,98.887,480.889,72.417,476.624,55.698z M80.476,67.204 c3.463-13.563,14.344-20.658,23.315-20.658h0.005h17.576l0.129,92.641C85.512,111.52,75.942,84.973,80.476,67.204z M328.203,416.524v48.93H183.794v-48.93H328.203z M344.117,181.596c0,0.064,0,0.127,0,0.191v4.732 c0,48.513-39.471,87.982-87.988,87.982c-48.533,0-88.017-39.467-88.017-88.014l-0.195-139.94h176.201V181.596z M390.662,139.062 V46.545h17.548h0.005c8.965,0,19.85,7.097,23.312,20.66C436.05,84.949,426.518,111.442,390.662,139.062z" />
                            </g>
                        </g>
                    </g>
                </svg>
                <p>Best of the year</p>
            </li>
            <li class="sidebar__all-time">
                <svg viewBox="0 0 24 24" fill="#FF334D" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg">
                    <g id="Line">
                        <path
                            d="M13,11H11a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V13A2,2,0,0,0,13,11Zm-2,8V13h2v6Z" />
                        <path d="M5,6H3A2,2,0,0,0,1,8V19a2,2,0,0,0,2,2H5a2,2,0,0,0,2-2V8A2,2,0,0,0,5,6ZM3,19V8H5V19Z" />
                        <path d="M21,3H19a2,2,0,0,0-2,2V19a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V5A2,2,0,0,0,21,3ZM19,19V5h2V19Z" />
                    </g>
                </svg>
                <p>All time top 250</p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { routeNames } from '../router/routeNames';
</script>