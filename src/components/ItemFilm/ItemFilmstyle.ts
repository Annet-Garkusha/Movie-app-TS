import styled from "styled-components";

export const FilmStyle = styled.div`
  display: flex;
  max-width: 454px;
  box-shadow: 5px 5px 5px #827e7e;
  margin-right: 36px;
  min-height: 350px;
  margin-bottom: 35px;
  justify-content: flex-start;
  transition-duration: 0.2s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const ImageFilmStyle = styled.img`
  width: 183px;
  margin-right: 20px;
`;

export const ContentFilmStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  position: relative;
  max-width: 268px;
  box-sizing: border-box;
`;

export const TitleFilmStyle = styled.div`
  font-size: 20px;
  font-weight: 600;
  font-family: "Inter";
  padding-top: 12px;
  max-width: 80%;
  margin-bottom: 7px;
`;

export const RateFilmStyle = styled.div<{ colorRate: number }>`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  border-radius: 50%;
  border-color: ${({ colorRate }) => {
    if (colorRate > 0 && colorRate <= 3) {
      return "#E90000";
    }
    if (colorRate > 3 && colorRate <= 5) {
      return "#E97E00";
    }
    if (colorRate > 5 && colorRate <= 7) {
      return "#E9D100";
    } else if (colorRate > 7) {
      return "#66E900";
    }
  }};
`;

export const OverviewFilmStyle = styled.p`
  line-height: 22px;
  font-family: "Inter";
  margin: 0;
  padding-bottom: 10px;
  color: rgba(0, 0, 0, 0.85);
`;

export const DataFilmStyle = styled.div`
  color: #827e7e;
  margin-bottom: 9px;
  font-size: 14px;
  font-family: "Inter";
`;

export const GenreListFilmStyle = styled.ul`
  padding: 0;
  margin-bottom: 5px;
`;

export const GenreItemFilmStyle = styled.li`
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  display: inline-block;
  padding: 0 7px;
  text-align: center;
  width: max-content;
  color: rgba(0, 0, 0, 0.85);
  margin-right: 5px;
  margin-bottom: 5px;
`;
