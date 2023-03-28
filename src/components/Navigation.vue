<style scoped lang="scss">
.navigation {
    margin-bottom: 30px;
    padding: 20px 0;
    display: flex;
    gap: 30px;
    justify-content: space-between;
    align-items: center;

    &__logo {
        display: flex;
        align-items: center;

        img {
            margin-right: 10px;
            width: 40px;
            height: 40px;
        }

        p {
            font-weight: 900;
            font-size: 28px;
        }
    }

    &__search-bar {
        position: relative;
        display: flex;
        align-items: center;
        border-radius: 9999px;
        flex: 1 1 100%;
        background-color: var(--white);

        img {
            z-index: 1;
            position: absolute;
            left: 15px;
            width: 20px;
            height: 20px;
        }
    }

    &__search {
        position: relative;
        z-index: 20;
        width: 100%;
        font-weight: 500;
        font-size: 18px;
        padding: 15px 30px 15px 45px;
        background-color: transparent;
    }

    &__user {
        display: flex;
    }

    &__user-profile {
        display: flex;
        align-items: center;

        img {
            cursor: pointer;
            width: 50px;
            height: 50px;
        }

        p {
            cursor: pointer;
            margin-left: 10px;
            white-space: nowrap;
            font-weight: 500;
            font-size: 18px;
            transition: 0.3s ease;

            &:hover {
                color: var(--lRed);
            }
        }
    }

    &__settings {
        margin-left: 15px;
        display: flex;
        align-items: center;
        cursor: pointer;

        svg {
            path {
                transition: 0.3s ease;
            }
            &:hover {
                path {
                    fill: var(--lRed);
                }
            }
        }
    }
}
</style>

<template>
    <div class="navigation">
        <div class="navigation__logo">
            <img src="../assets/ico/navigation/mainLogo.svg" alt="">
            <p>Gotty</p>
        </div>
        <div class="navigation__search-bar">
            <img src="../assets/ico/navigation/searchIcon.svg" alt="">
            <input type="text" placeholder="Search" class="navigation__search">
        </div>
        <div class="navigation__user">
            <div class="navigation__user-profile">
                <img src="https://cdn-icons-png.flaticon.com/512/727/727399.png" alt="">
                <p>My collection</p>
            </div>
            <div class="navigation__settings">
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10Z"
                        fill="#fff" />
                    <path
                        d="M12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z"
                        fill="#fff" />
                    <path
                        d="M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z"
                        fill="#fff" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>
