import { toast } from "react-toastify";

export const removeItemToWatchlist = (e, id, setIsCoinAdded) => {
  e.preventDefault();
  if (window.confirm("Êtes-vous sûr de vouloir supprimer cette monnaie de votre watchlist ?")) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist"));
    const newList = watchlist.filter((coin) => coin !== id);
    setIsCoinAdded(false);
    localStorage.setItem("watchlist", JSON.stringify(newList));
    toast.success(
      `${
        id.substring(0, 1).toUpperCase() + id.substring(1)
      } - à été supprimé !`
    );
    window.location.reload();
  } else {
    toast.error(
      `${
        id.substring(0, 1).toUpperCase() + id.substring(1)
      } - ne peut pas être supprimé !`
    );
    setIsCoinAdded(true);
  }
};