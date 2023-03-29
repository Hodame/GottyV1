<template>
    <div class="sidebar">
        <RouterLink style="color: var(--white);"  :to="{ name: routeNames.Home}">
            <div class="sidebar__home">Home</div>
        </RouterLink>
        <div class="sidebar__profile">
            <div class="sidebar__user">
                <p>hodame</p>
                <img width="40px" height="40px" src="https://cdn-icons-png.flaticon.com/512/727/727399.png" alt="userLogo">
            </div>
            <ul class="sidebar__profile-list">
                <li class="sidebar__profile-wishlist">
                    <svg width="25" height="25" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M56 205V25H194V205L125 163L56 205Z" stroke="#FF334D" stroke-width="50" />
                    </svg>
                    <p>Wishlist</p>
                </li>
                <li class="sidebar__profile-collection">
                    <svg width="25" height="25" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_14_17)">
                            <rect x="20" y="107" width="210" height="123" rx="37" stroke="#FF334D" stroke-width="40" />
                            <rect x="85" width="80" height="25" fill="#FF334D" />
                            <path d="M50 43H200V73H50V43Z" fill="#FF334D" />
                        </g>
                        <defs>
                            <clipPath id="clip0_14_17">
                                <rect width="250" height="250" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <p>My collection</p>
                </li>
            </ul>
        </div>
        <ul class="sidebar__releases">
            <span>New releases</span>
            <li class="sidebar__last-30">
                <svg width="25" height="25" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_14_25)">
                        <rect x="25" y="75" width="200" height="150" rx="32" stroke="#FF334D" stroke-width="50" />
                        <rect x="54" width="50" height="50" fill="#FF334D" />
                        <path d="M139 0H189V50H139V0Z" fill="#FF334D" />
                    </g>
                    <defs>
                        <clipPath id="clip0_14_25">
                            <rect width="250" height="250" fill="white" />
                        </clipPath>
                    </defs>
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
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px" y="0px" width="25px" height="25px" viewBox="0 0 612 612"
                    style="enable-background:new 0 0 612 612;" xml:space="preserve">
                    <g>
                        <g>
                            <g id="Trophy">
                                <g>
                                    <path fill="#FF334D" d="M135.235,340.748c0.204,0,0.476-0.034,0.765-0.085V340C134.657,340.561,134.725,340.748,135.235,340.748z M272,510h-34
                            					c-37.553,0-68,30.447-68,68h272c0-37.553-30.447-68-68-68h-34v-68h-34h-34V510z M476.765,340.748
                            					c0.512,0,0.562-0.188-0.765-0.748v0.663C476.289,340.714,476.561,340.748,476.765,340.748z M578,102H476V68
                            					c0-18.785-15.215-34-34-34H170c-18.785,0-34,15.215-34,34v34H34c-18.785,0-34,15.215-34,34v68c0,54.655,36.227,136,136,136
                            					h14.246C176.494,400.027,236.317,442,306,442c69.7,0,129.523-41.973,155.754-102H476c99.773,0,136-81.345,136-136v-68
                            					C612,117.215,596.785,102,578,102z M136,272c-62.084,0-67.728-52.224-68-68v-34h68V272z M408,293.216l-8.551,19.55
                            					C383.18,349.962,346.511,374,306,374s-77.18-24.038-93.449-61.234L204,293.216V102h204V293.216z M544,204
                            					c0,11.356-3.281,68-68,68V170h68V204z" />
                                </g>
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